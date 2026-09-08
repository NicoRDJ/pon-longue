import { NextRequest, NextResponse } from "next/server";
import { getDepositReceipt } from "@/lib/depositReceipts";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ reference: string }> },
) {
  // Receipts show a bank transfer — only staff should ever see them.
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { reference } = await params;
  const receipt = getDepositReceipt(decodeURIComponent(reference));
  if (!receipt) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const buffer = Buffer.from(receipt.base64Data, "base64");
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": receipt.mimeType,
      "Cache-Control": "private, no-store",
    },
  });
}

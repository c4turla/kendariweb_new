import { auth } from "@/lib/auth";
import { toNodeHandler } from "better-auth/node";
import { NextRequest } from "next/server";

const handler = auth.handler;
export { handler as GET, handler as POST };
import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { prisma } from "./db";

type FunctionProps = {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
};

export default async function createAuditLog({
  action,
  entityId,
  entityTitle,
  entityType,
}: FunctionProps) {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("user not found");
    }
    await prisma.auditLog.create({
      data: {
        action,
        entityId,
        entityTitle,
        entityType,
        orgId,
        userId: user.id,
        userImage: user.imageUrl,
        userName: `${user.firstName} ${user.lastName}`,
      },
    });
  } catch (e) {
    console.log("[AUDIT_LOG_ERROR] ", e);
  }
}

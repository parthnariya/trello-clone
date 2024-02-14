"use client";
import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const OrgControl = () => {
  const { orgId } = useParams();
  const { setActive } = useOrganizationList();
  useEffect(() => {
    if (!setActive) return;
    setActive({ organization: orgId as string });
  }, [setActive, orgId]);
  return null;
};

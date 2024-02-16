import { OrganizationProfile } from "@clerk/nextjs";

export default function SettingPage() {
  return (
    <div className="w-full">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
                boxShadow:"none",
                width:"100%"
            },
            card:{
                boxShadow:"none",
                border:"1px solid #e5e5e5",
                width:"100%"
            }
          },
        }}
      />
    </div>
  );
}

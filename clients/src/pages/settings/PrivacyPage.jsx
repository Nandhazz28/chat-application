import { useState } from "react";

const PrivacyPage = () => {
  const [settings, setSettings] = useState({
    showOnlineStatus: true,
    allowMessages: true,
    readReceipts: true,
  });

  const handleToggle = (field) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          Privacy Settings
        </h1>

        <div className="space-y-6">

          <div className="flex justify-between items-center">
            <span>Show Online Status</span>

            <input
              type="checkbox"
              checked={settings.showOnlineStatus}
              onChange={() =>
                handleToggle("showOnlineStatus")
              }
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Allow Messages From Everyone</span>

            <input
              type="checkbox"
              checked={settings.allowMessages}
              onChange={() =>
                handleToggle("allowMessages")
              }
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Read Receipts</span>

            <input
              type="checkbox"
              checked={settings.readReceipts}
              onChange={() =>
                handleToggle("readReceipts")
              }
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default PrivacyPage;
"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { updateSiteSettings } from "@/app/actions/site-settings";
import type { SiteSettings } from "@/lib/settings";
import { InputField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [gaId, setGaId] = useState(settings.gaId ?? "");
  const [googleSiteVerification, setGoogleSiteVerification] = useState(
    settings.googleSiteVerification ?? "",
  );
  const [bingSiteVerification, setBingSiteVerification] = useState(
    settings.bingSiteVerification ?? "",
  );
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setStatus(null);

    const result = await updateSiteSettings({
      gaId,
      googleSiteVerification,
      bingSiteVerification,
    });

    setStatus({ ok: result.success, message: result.message });
    setSaving(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <InputField
          label="Google Analytics Measurement ID"
          id="gaId"
          placeholder="G-XXXXXXXXXX"
          value={gaId}
          onChange={(event) => setGaId(event.target.value)}
        />
        <p className="mt-1.5 text-xs text-slate-500">
          From analytics.google.com — create a GA4 property, then copy the Measurement ID.
        </p>
      </div>

      <div>
        <InputField
          label="Google Search Console Verification Code"
          id="googleSiteVerification"
          placeholder="e.g. abc123def456..."
          value={googleSiteVerification}
          onChange={(event) => setGoogleSiteVerification(event.target.value)}
        />
        <p className="mt-1.5 text-xs text-slate-500">
          From search.google.com/search-console — add a property, choose the &ldquo;HTML tag&rdquo;
          verification method, and paste just the <code className="rounded bg-slate-100 px-1">content=&quot;...&quot;</code>{" "}
          value, not the full tag.
        </p>
      </div>

      <div>
        <InputField
          label="Bing Webmaster Tools Verification Code"
          id="bingSiteVerification"
          placeholder="e.g. ABC123DEF456..."
          value={bingSiteVerification}
          onChange={(event) => setBingSiteVerification(event.target.value)}
        />
        <p className="mt-1.5 text-xs text-slate-500">
          From bing.com/webmasters — usually unnecessary if you import the site from Google Search
          Console instead. Same rule: paste just the code value.
        </p>
      </div>

      {status ? (
        <p role="alert" className={`text-sm ${status.ok ? "text-brand-teal" : "text-red-600"}`}>
          {status.message}
        </p>
      ) : null}

      <Button type="submit" disabled={saving}>
        {saving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4" aria-hidden="true" />
            Save Settings
          </>
        )}
      </Button>
    </form>
  );
}

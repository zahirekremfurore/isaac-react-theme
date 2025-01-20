import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getPhoneData, PhoneInput } from "@/components/ui/phone-input";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ConfigSms(props: PageProps<Extract<KcContext, { pageId: "config-sms.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const [phoneError, setPhoneError] = useState<string | null>(null);


    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { auth, url, messagesPerField } = kcContext;

    const validatePhone = (value: string) => {
        if (!value) {
            setPhoneError("Phone number is required");
            return false;
        }

        const phoneData = getPhoneData(value);
        if (!phoneData.isValid) {
            setPhoneError("Invalid phone number");
            return false;
        }

        setPhoneError(null);
        return true;
    };

    

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={false}
            headerNode={false}
        >

            <form id="kc-otp-login-form" className=""
            
            // action={url.loginAction} 
            // method="post" 
            onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = Object.fromEntries(new FormData(form));
                const isValid = validatePhone(data.phone as string);
                
                if (isValid) {
                    // Proceed with form submission
                    form.submit();
                }
            }}
            
            >
                <div className="">
                    <div className="">
                        <Label htmlFor="phone" className=" cursor-pointer mb-2">
                            {/* {msg("loginOtpOneTime")} */}
                            Phone Number
                        </Label>
                    </div>

                    <div className="">
                        <PhoneInput
                            name="phone"
                            id="phone"
                            defaultCountry="NL"
                            aria-invalid={messagesPerField.existsError("phone") || !!phoneError ? "true" : undefined}
                            onChange={(value) => {
                                if (value) {
                                    validatePhone(value);
                                } else {
                                    setPhoneError("Phone number is required");
                                }
                            }}
                        />
                        {messagesPerField.existsError("phone") || !!phoneError && (
                            <span
                                id="input-error-phone"
                                className="mt-2 block text-sm text-red-600"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{ __html: phoneError || messagesPerField.get("phone") }}
                            />
                        )}
                    </div>
                </div>
                    <div className="flex justify-end gap-4 mt-8">
                        <Button disabled = {phoneError !== null}  id="kc-submit" type="submit" >
                            {msgStr("doSubmit")}
                        </Button>
                    </div>

                
            </form>
        </Template>
    );
}

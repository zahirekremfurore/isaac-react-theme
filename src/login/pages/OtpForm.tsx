import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp"

export default function OtpForm(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { auth, url, messagesPerField } = kcContext;

    console.log({ kcContext });

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={false}
            headerNode={false}
        >

            <form id="kc-otp-login-form" className="" action={url.loginAction} method="post">
                <div className="">
                    <div className="">
                        <Label htmlFor="otp" className=" cursor-pointer mb-2">
                            {msg("loginOtpOneTime")}
                        </Label>
                    </div>

                    <div className="mt-4">
                        <InputOTP 
                            maxLength={9}
                            name="otp"
                            id="otp"
                            aria-invalid={messagesPerField.existsError("totp") ? "true" : undefined}
                            pattern={REGEXP_ONLY_DIGITS}
                            className="w-full"
                            autoFocus
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                                <InputOTPSlot index={6} />
                                <InputOTPSlot index={7} />
                            </InputOTPGroup>
                            
                        </InputOTP>
                        {messagesPerField.existsError("totp") && (
                            <span
                                id="input-error-otp-code"
                                className="mt-2 block text-sm text-red-600"
                                aria-live="polite"
                                dangerouslySetInnerHTML={{ __html: messagesPerField.get("totp") }}
                            />
                        )}
                    </div>
                </div>

               
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")} />
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        {/* <Button name="resend" id="kc-resend" type="submit" variant="outline" >
                            {msgStr("doResend")}
                        </Button> */}

                        <Button name="submit" id="kc-submit" type="submit" value="Save">
                            {msgStr("doSubmit")}
                        </Button>
                    </div>

                
            </form>
        </Template>
    );
}

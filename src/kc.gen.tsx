// This file is auto-generated by the `update-kc-gen` command. Do not edit it manually.
// Hash: 35e295cd0013872ff8a2c38970103bee7b226f491393aaede4e8fad3df3e7011

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

import { lazy, Suspense, type ReactNode } from "react";

export type ThemeName = "isaac-react-theme";

export const themeNames: ThemeName[] = ["isaac-react-theme"];

export type KcEnvName = never;

export const kcEnvNames: KcEnvName[] = [];

export const kcEnvDefaults: Record<KcEnvName, string> = {};

/**
 * NOTE: Do not import this type except maybe in your entrypoint.
 * If you need to import the KcContext import it either from src/login/KcContext.ts or src/account/KcContext.ts.
 * Depending on the theme type you are working on.
 */
export type KcContext =
    | import("./login/KcContext").KcContext
    | import("./account/KcContext").KcContext;

declare global {
    interface Window {
        kcContext?: KcContext;
    }
}

export const KcLoginPage = lazy(() => import("./login/KcPage"));
export const KcAccountPage = lazy(() => import("./account/KcPage"));

export function KcPage(props: { kcContext: KcContext; fallback?: ReactNode }) {
    const { kcContext, fallback } = props;
    return (
        <Suspense fallback={fallback}>
            {(() => {
                switch (kcContext.themeType) {
                    case "login":
                        return <KcLoginPage kcContext={kcContext} />;
                    case "account":
                        return <KcAccountPage kcContext={kcContext} />;
                }
            })()}
        </Suspense>
    );
}

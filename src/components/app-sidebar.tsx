import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from "@/components/ui/sidebar";
import type { KcContext } from "../account/KcContext";
import type { I18n } from "../account/i18n";

import logo from "../../public/logo.svg";
import { NavUser } from "./nav-user";

export function AppSidebar({
    kcContext,
    i18n,
    ...props
}: React.ComponentProps<typeof Sidebar> & { kcContext: KcContext; i18n: I18n }) {
    console.log({ kcContext });
    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const keycloakLinks = [
        { id: "account", label: "Account", url: kcContext.url.accountUrl },
        { id: "password", label: "Password", url: kcContext.url.passwordUrl },
        { id: "totp", label: "Authenticator", url: kcContext.url.totpUrl },
        {
            id: "social",
            label: "Identity Providers",
            url: kcContext.url.socialUrl,
            feature: kcContext.features?.identityFederation
        },
        // { id: 'sessions', label: 'Sessions', url: kcContext.url.sessionsUrl, feature: kcContext.features?.sessions },
        // { id: 'applications', label: 'Applications', url: kcContext.url.applicationsUrl, feature: kcContext.features?.applications },
        {
            id: "log",
            label: "Account Access",
            url: kcContext.url.logUrl,
            feature: kcContext.features?.log
        }
    ];

  
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className="flex justify-center">
                    <img src={logo} alt="logo" className="w-16 h-16 rounded-full" />
                </div>
            </SidebarHeader>
          
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Account Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {keycloakLinks
                                .filter(
                                    link => link.feature === undefined || link.feature
                                )
                                .map(link => (
                                    <SidebarMenuItem key={link.id}>
                                        <SidebarMenuButton
                                            asChild
                                            className="data-[active=true]:bg-primary/95 data-[active=true]:text-sidebar-accent-foreground"
                                            isActive={
                                                kcContext.pageId === `${link.id}.ftl`
                                            }
                                        >
                                            <a href={link.url}>{link.label}</a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{
                  name:kcContext.account.username as string,
                  email:kcContext.account.email as string,
                  logoutText:msg("doSignOut"),
                  logoutUrl:kcContext.url.logoutUrl
              
                }} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}


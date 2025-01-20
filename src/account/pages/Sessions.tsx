import type { I18n } from "../i18n";
import type { KcContext } from "../KcContext";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Button } from "@/components/ui/button";

export default function Sessions(props: PageProps<Extract<KcContext, { pageId: "sessions.ftl" }>, I18n>) {
    const { kcContext, i18n, Template, classes: classes_props, doUseDefaultCss = true } = props;

    const { msg } = i18n;

    return (
        <Template active="sessions" kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss}>
            <div>
                <h2 className="text-2xl font-bold">{msg("sessions")}</h2>
                <div className="mt-4 max-w-2xl">
                    <Table className="w-full border rounded-md shadow-sm">
                        <TableHeader className=" ">
                            <TableRow className=" ">
                                <TableHead className="">
                                    <span>{msg("ip")}</span>
                                </TableHead>
                                <TableHead className="">
                                    <span>{msg("lastAccess")}</span>
                                </TableHead>
                                <TableHead className="">
                                    <span>{msg("client")}</span>
                                </TableHead>
                                <TableHead className="text-right">
                                    <span>{msg("application")}</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kcContext?.sessions?.sessions?.map(session => (
                                <TableRow key={session.id}>
                                    <TableCell>
                                        <div className="text-sm text-gray-900">{session.ipAddress}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-gray-900">{session.lastAccess}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-gray-900">{session.clients[0]}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm text-gray-900">{new Date(session.expires) > new Date() ? "Active" : "Inactive"}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Button asChild variant={"destructive"} size="sm">
                                            <a href={kcContext.url.getLogoutUrl()}>{msg("doSignOut")}</a>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <form className="mt-4 mr-auto" action={kcContext.url.sessionsUrl} method="post">
                        <input type="hidden" id="stateChecker" name="stateChecker" value={kcContext.stateChecker} />
                        <Button type="submit" id="logout-all-sessions" variant={"destructive"} size="lg">
                            {msg("doLogOutAllSessions")}
                        </Button>
                    </form>
                </div>
            </div>
        </Template>
    );
}

import type { I18n } from "../i18n";
import type { KcContext } from "../KcContext";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function Applications(props: PageProps<Extract<KcContext, { pageId: "applications.ftl" }>, I18n>) {
    const { kcContext, i18n, Template, doUseDefaultCss = true } = props;

    const { msg } = i18n;

    return (
        <Template active="applications" kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss}>
            <div>
                <h2 className="text-2xl font-bold">{msg("applicationsHtmlTitle")}</h2>
                <div className="mt-4">
                    <form action={kcContext.url.applicationsUrl} method="post">
                        <input type="hidden" id="stateChecker" name="stateChecker" value={kcContext.stateChecker} />
                        <input type="hidden" id="referrer" name="referrer" value={kcContext.stateChecker} />

                        <Table className="w-full border rounded-md shadow-sm">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{msg("application")}</TableHead>
                                    <TableHead>{msg("availableRoles")}</TableHead>
                                    <TableHead>{msg("grantedPermissions")}</TableHead>
                                    <TableHead>{msg("additionalGrants")}</TableHead>
                                    <TableHead>{msg("action")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {kcContext.applications.applications.map((application) => (
                                    <TableRow key={application.client.clientId}>
                                        <TableCell>
                                            {application.effectiveUrl ? (
                                                <a href={application.effectiveUrl} className="text-blue-600 hover:underline">
                                                    {application.client.name || application.client.clientId}
                                                </a>
                                            ) : (
                                                application.client.name || application.client.clientId
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                {/* Realm Roles */}
                                                {application.realmRolesAvailable.map((role, index) => (
                                                    <span key={role.name}>
                                                        {role.description || role.name}
                                                        {index < application.realmRolesAvailable.length - 1 && ", "}
                                                    </span>
                                                ))}
                                                
                                                {/* Resource Roles */}
                                                {Object.entries(application.resourceRolesAvailable).map(([resource, roles]) => (
                                                    roles.map((clientRole, index) => (
                                                        <span key={`${resource}-${clientRole.roleName}`}>
                                                            {application.realmRolesAvailable.length > 0 && ", "}
                                                            {clientRole.roleDescription || clientRole.roleName}{" "}
                                                            {msg("inResource")}{" "}
                                                            <strong>
                                                                {clientRole.clientName || clientRole.clientId}
                                                            </strong>
                                                            {index < roles.length - 1 && ", "}
                                                        </span>
                                                    ))
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {application.client.consentRequired ? (
                                                <div className="text-sm">
                                                    {application.clientScopesGranted.join(", ")}
                                                </div>
                                            ) : (
                                                <strong>{msg("fullAccess")}</strong>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                {application.additionalGrants.join(", ")}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {((application.client.consentRequired && 
                                               application.clientScopesGranted.length > 0) || 
                                               application.additionalGrants.length > 0) && (
                                                <Button
                                                    type="submit"
                                                    name="clientId"
                                                    value={application.client.id}
                                                    variant="destructive"
                                                    size="sm"
                                                >
                                                    {msg("revoke")}
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </form>
                </div>
            </div>
        </Template>
    );
}

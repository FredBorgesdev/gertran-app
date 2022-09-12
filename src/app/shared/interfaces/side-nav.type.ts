export interface SideNavInterface {
    redirectTo?: string;
    path: string;
    title: string;
    iconType: "" | "nzIcon" | "fontawesome";
    iconTheme: "" | "fab" | "far" | "fas" | "fill" | "outline" | "twotone";
    icon: string,
    submenu : SideNavInterface[];
}

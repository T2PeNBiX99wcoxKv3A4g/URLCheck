import type React from "react";
import LinkSvg from "./icons/link.svg?react";
import LogoSvg from "./icons/logo.svg?react";
import HomeSvg from "./icons/home.svg?react";
import LayersSvg from "./icons/layers.svg?react";
import HistorySvg from "./icons/history.svg?react";
import SettingsSvg from "./icons/settings.svg?react";
import CheckCircleSvg from "./icons/check-circle.svg?react";
import AlertTriangleSvg from "./icons/alert-triangle.svg?react";
import XCircleSvg from "./icons/x-circle.svg?react";
import SearchSvg from "./icons/search.svg?react";
import ShieldCheckSvg from "./icons/shield-check.svg?react";
import LockSvg from "./icons/lock.svg?react";
import CopySvg from "./icons/copy.svg?react";
import RedirectSvg from "./icons/redirect.svg?react";
import PlusSvg from "./icons/plus.svg?react";
import TrashSvg from "./icons/trash.svg?react";
import PlaySvg from "./icons/play.svg?react";
import SendSvg from "./icons/send.svg?react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>;

/** Wraps an imported SVG so it keeps the shared `size` prop and inherits `currentColor`. */
function sized(Svg: SvgComponent): React.FC<IconProps> {
    const Icon: React.FC<IconProps> = ({size = 20, ...props}) => <Svg width={size} height={size} {...props}/>;
    Icon.displayName = Svg.displayName ?? "Icon";
    return Icon;
}

export const LinkIcon = sized(LinkSvg);
export const LogoIcon = sized(LogoSvg);
export const HomeIcon = sized(HomeSvg);
export const LayersIcon = sized(LayersSvg);
export const HistoryIcon = sized(HistorySvg);
export const SettingsIcon = sized(SettingsSvg);
export const CheckCircleIcon = sized(CheckCircleSvg);
export const AlertTriangleIcon = sized(AlertTriangleSvg);
export const XCircleIcon = sized(XCircleSvg);
export const SearchIcon = sized(SearchSvg);
export const ShieldCheckIcon = sized(ShieldCheckSvg);
export const LockIcon = sized(LockSvg);
export const CopyIcon = sized(CopySvg);
export const RedirectIcon = sized(RedirectSvg);
export const PlusIcon = sized(PlusSvg);
export const TrashIcon = sized(TrashSvg);
export const PlayIcon = sized(PlaySvg);
export const SendIcon = sized(SendSvg);

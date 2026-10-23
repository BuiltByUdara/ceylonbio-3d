"use client";
import * as React from "react";
import { Select as S } from "@base-ui/react/select";
import { Popover as P } from "@base-ui/react/popover";
import { Tooltip as T } from "@base-ui/react/tooltip";
import * as Icons from "lucide-react";

export function cn(...values: (string | false | null | undefined)[]) {
  return values.filter(Boolean).join(" ");
}
export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { variant?: string; size?: string }
>(function Button({ variant, size, className, ...props }, ref) {
  return (
    <button ref={ref} className={cn("organ-button", className)} {...props} />
  );
});
export function Alert(props: React.ComponentProps<"div">) {
  return <div role="alert" {...props} />;
}
export function AlertTitle(props: React.ComponentProps<"h3">) {
  return <h3 {...props} />;
}
export function AlertDescription(props: React.ComponentProps<"div">) {
  return <div {...props} />;
}
export function Progress({
  value,
  ...props
}: Omit<React.ComponentProps<"progress">, "value"> & { value?: number | null }) {
  return <progress max={100} value={value ?? undefined} {...props} />;
}
export function Spinner() {
  return <span role="status">Loading…</span>;
}
export const Select = S.Root;
export const SelectTrigger = S.Trigger;
export const SelectValue = S.Value;
export const SelectGroup = S.Group;
export const SelectItem = S.Item;
export function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <S.Portal>
      <S.Positioner className="z-50">
        <S.Popup className="organ-popup">
          <S.List>{children}</S.List>
        </S.Popup>
      </S.Positioner>
    </S.Portal>
  );
}
export const Popover = P.Root;
export const PopoverTrigger = P.Trigger;
export function PopoverContent({
  children,
  side,
  align,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "top" | "bottom";
  align?: "start" | "end";
}) {
  return (
    <P.Portal>
      <P.Positioner side={side} align={align} className="z-50">
        <P.Popup {...props} className="organ-popup">
          {children}
        </P.Popup>
      </P.Positioner>
    </P.Portal>
  );
}
export const Tooltip = T.Root;
export const TooltipProvider = T.Provider;
export const TooltipTrigger = T.Trigger;
export function TooltipContent({ children }: { children: React.ReactNode; side?: "top" | "bottom" | "left" | "right" }) {
  return (
    <T.Portal>
      <T.Positioner className="z-50">
        <T.Popup className="organ-popup">{children}</T.Popup>
      </T.Positioner>
    </T.Portal>
  );
}
export function Toggle({
  pressed,
  onPressedChange,
  ...props
}: React.ComponentProps<"button"> & {
  pressed?: boolean;
  onPressedChange?: (value: boolean) => void;
}) {
  return (
    <Button
      aria-pressed={pressed}
      onClick={() => onPressedChange?.(!pressed)}
      {...props}
    />
  );
}
export function Slider({
  value,
  onValueChange,
  ...props
}: Omit<React.ComponentProps<"input">, "value" | "onChange"> & {
  value: number[];
  onValueChange: (value: number[]) => void;
}) {
  return (
    <input
      type="range"
      value={value[0]}
      onChange={(e) => onValueChange([Number(e.target.value)])}
      {...props}
    />
  );
}
export function IconPlaceholder({
  lucide,
  tabler,
  hugeicons,
  phosphor,
  remixicon,
  ...props
}: React.ComponentProps<typeof Icons.Info> & {
  lucide: string;
  tabler?: string;
  hugeicons?: string;
  phosphor?: string;
  remixicon?: string;
}) {
  const Icon =
    (Icons as unknown as Record<string, typeof Icons.Info>)[
      lucide.replace(/Icon$/, "")
    ] ?? Icons.Info;
  return <Icon size={16} {...props} />;
}


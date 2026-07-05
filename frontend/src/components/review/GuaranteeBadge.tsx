interface GuaranteeBadgeProps {
  badgeImage: string;
  badgeText: string;
  heading: string;
  body: string;
}

export function GuaranteeBadge({ badgeImage, badgeText, heading, body }: GuaranteeBadgeProps) {
  return (
    <div className="flex items-center gap-4">
      <img src={badgeImage} alt={badgeText} className="h-[78px] w-[78px] flex-shrink-0 object-contain" />
      <div>
        <p className="text-sm font-semibold text-ink-900">{heading}</p>
        <p className="text-xs text-ink-900/75">{body}</p>
      </div>
    </div>
  );
}

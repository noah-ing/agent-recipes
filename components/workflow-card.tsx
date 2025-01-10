import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WorkflowCardProps {
  slug: string
  title: string
  description: string
  imageSrc: string
  tag?: string
  priority?: boolean
}

export function WorkflowCard({
  slug,
  title,
  description,
  imageSrc,
  tag,
  priority = false
}: WorkflowCardProps) {
  return (
    <Link href={`/recipes/${slug}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md hover:border-primary/20 group">
        <div className="aspect-[2/1] relative bg-muted">
          <Image
            src={imageSrc}
            alt={`${title} workflow diagram`}
            fill
            priority={priority}
            className="object-cover p-6 transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            {tag && (
              <Badge variant="secondary" className="text-xs font-medium uppercase tracking-wide">
                {tag}
              </Badge>
            )}
          </div>
          <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </Card>
    </Link>
  )
}

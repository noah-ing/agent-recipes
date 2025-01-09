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
}

export function WorkflowCard({
  slug,
  title,
  description,
  imageSrc,
  tag
}: WorkflowCardProps) {
  return (
    <Link href={`/recipes/${slug}`}>
      <Card className="overflow-hidden transition-colors hover:bg-muted/50">
        <div className="aspect-[2/1] relative">
          <Image
            src={imageSrc}
            alt={`${title} workflow diagram`}
            fill
            className="object-cover p-6 bg-background/50"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-mono">{title}</h3>
            {tag && (
              <Badge variant="secondary" className="font-mono">
                {tag}
              </Badge>
            )}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
      </Card>
    </Link>
  )
}


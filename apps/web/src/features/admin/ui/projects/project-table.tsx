import { Empty } from '@/shared/components/ui/empty';
import { Table } from '@/shared/components/ui/table';
import { formatShortDate } from '@/shared/lib/format-date';
import type { ProjectDto } from '@repo/contracts';
import Link from 'next/link';
import { DeleteProjectButton } from './delete-project-button';
import { LocaleBadge, StatusBadge } from '../status-badge';

export function ProjectTable({ projects }: { projects: ProjectDto[] }) {
  if (projects.length === 0) {
    return (
      <Empty variant="outline">
        <Empty.Header>
          <Empty.Title>no projects yet</Empty.Title>
          <Empty.Description>create the first one and it shows up here.</Empty.Description>
        </Empty.Header>
      </Empty>
    );
  }

  return (
    <div className="border-border overflow-hidden rounded-md border">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.Head>title</Table.Head>
            <Table.Head className="w-20">locale</Table.Head>
            <Table.Head className="w-28">status</Table.Head>
            <Table.Head className="w-16">order</Table.Head>
            <Table.Head className="w-28 text-right">updated</Table.Head>
            <Table.Head className="w-14" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projects.map((project) => (
            <Table.Row key={project.id}>
              <Table.Cell className="text-[13px]">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="hover:underline hover:underline-offset-4"
                >
                  {project.title || 'untitled'}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <LocaleBadge locale={project.locale} />
              </Table.Cell>
              <Table.Cell>
                <StatusBadge status={project.status} />
              </Table.Cell>
              <Table.Cell className="text-muted-foreground font-mono text-xs">
                {project.order}
              </Table.Cell>
              <Table.Cell className="text-muted-foreground text-right font-mono text-xs">
                {formatShortDate(project.updatedAt)}
              </Table.Cell>
              <Table.Cell className="py-2">
                <div className="flex justify-end">
                  <DeleteProjectButton id={project.id} title={project.title} />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

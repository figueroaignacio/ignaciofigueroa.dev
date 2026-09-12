import { Empty } from '@/shared/components/ui/empty';
import { Table } from '@/shared/components/ui/table';
import type { ContentStatus, Locale } from '@repo/contracts';
import Link from 'next/link';
import { LocaleBadge, StatusBadge } from './status-badge';

export interface EntityRow {
  id: string;
  title: string;
  subtitle?: string | null;
  locale: Locale;
  status: ContentStatus;
}

interface EntityTableProps {
  rows: EntityRow[];
  basePath: string;
  emptyTitle: string;
  emptyDescription: string;
  actions: (row: EntityRow) => React.ReactNode;
}

export function EntityTable({
  rows,
  basePath,
  emptyTitle,
  emptyDescription,
  actions,
}: EntityTableProps) {
  if (rows.length === 0) {
    return (
      <Empty variant="outline">
        <Empty.Header>
          <Empty.Title>{emptyTitle}</Empty.Title>
          <Empty.Description>{emptyDescription}</Empty.Description>
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
            <Table.Head className="w-14" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row.id}>
              <Table.Cell className="text-[13px]">
                <Link
                  href={`${basePath}/${row.id}`}
                  className="hover:underline hover:underline-offset-4"
                >
                  {row.title}
                </Link>
                {row.subtitle ? (
                  <span className="text-muted-foreground ml-2 font-mono text-xs">
                    {row.subtitle}
                  </span>
                ) : null}
              </Table.Cell>
              <Table.Cell>
                <LocaleBadge locale={row.locale} />
              </Table.Cell>
              <Table.Cell>
                <StatusBadge status={row.status} />
              </Table.Cell>
              <Table.Cell className="py-2">
                <div className="flex justify-end">{actions(row)}</div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

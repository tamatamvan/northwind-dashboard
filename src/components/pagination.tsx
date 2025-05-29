import { Button } from './ui/button';

export function Pagination({
  page,
  pageSize,
  totalCount,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex items-center justify-between mt-4">
      <span className="text-gray-700">
        Page <span className="font-bold">{page}</span> of{' '}
        <span className="font-bold">{totalPages}</span>
      </span>
      <div className="flex space-x-2">
        <Button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="cursor-pointer"
        >
          Previous
        </Button>
        <Button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="cursor-pointer"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

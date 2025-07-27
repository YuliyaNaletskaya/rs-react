import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './Button';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <Button onClick={handlePrev} disabled={currentPage === 1}>
        <ArrowLeft />
      </Button>
      <span>
        Page {currentPage} from {totalPages}
      </span>
      <Button onClick={handleNext} disabled={currentPage === totalPages}>
        <ArrowRight />
      </Button>
    </div>
  );
};

export function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hr ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

export const getDateRangeFromFilter = (filter: string): { from: string; to: string } => {
  const now = new Date('2025-07-16'); // تاريخ ثابت للتجربة
  
  switch (filter) {
    case "all":
    case "All": {
      return { from: '', to: '' };
    }
    case "thisMonth":
    case "This Month": {
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return {
        from: thisMonthStart.toISOString().slice(0, 10),
        to: thisMonthEnd.toISOString().slice(0, 10)
      };
    }
    
    case "lastMonth":
    case "Last Month": {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthStart = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
      const lastMonthEnd = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);
      return {
        from: lastMonthStart.toISOString().slice(0, 10),
        to: lastMonthEnd.toISOString().slice(0, 10)
      };
    }
    
    case "thisYear":
    case "This Year": {
      const thisYearStart = new Date(now.getFullYear(), 0, 1);
      const thisYearEnd = new Date(now.getFullYear(), 11, 31);
      return {
        from: thisYearStart.toISOString().slice(0, 10),
        to: thisYearEnd.toISOString().slice(0, 10)
      };
    }
    
    default: {
      const defaultStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const defaultEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return {
        from: defaultStart.toISOString().slice(0, 10),
        to: defaultEnd.toISOString().slice(0, 10)
      };
    }
  }
}; 
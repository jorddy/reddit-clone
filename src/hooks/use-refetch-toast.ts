import toast from "react-hot-toast";
import { useEffect } from "react";

export const useRefetchToast = (isRefetching: boolean) => {
  useEffect(() => {
    if (isRefetching) {
      toast.loading("Refreshing posts...");
    } else {
      toast.dismiss();
    }

    return () => toast.remove();
  }, [isRefetching]);
};

import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface PropTypes extends ButtonProps {
  loading: boolean;
}

const MyLoadingButton = (props: PropTypes) => {
  const { loading, children, ...rest } = props;
  return (
    <Button startIcon={loading ? <CircularProgress size={16} /> : undefined} {...rest}>
      {children}
    </Button>
  );
};

export default MyLoadingButton;

import React from 'react';
import Catch from './functional-error-boundary.tsx';

interface Props {
  children: React.ReactNode;
}

export const MyErrorBoundary = Catch(function MyErrorBoundary(props: Props, error?: Error) {
  if (error) {
    return (
      <div className="error-screen">
        <h2>ERROR!!!</h2>
        <h4>{error.message}</h4>
      </div>
    );
  } else {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
});

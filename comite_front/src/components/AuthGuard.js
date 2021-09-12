import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthGuard = props => {
  const { children } = props;

  const session = useSelector(state => state.session);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.sessionToken) {
      navigate('/login', { replace: true });
      return;
    }

  }, [session, navigate]);

  return <Fragment>{children}</Fragment>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};


export default AuthGuard;
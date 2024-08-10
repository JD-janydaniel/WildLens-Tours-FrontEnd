import React from 'react';

const ResetPassword = () => {
    return (
        <div>
            <div className="container  signup mt-5">
        <div className="row py-5">
          <div className="col-12 col-md-6 px-4 py-5 shadow rounded-4 order-2 overflow-auto align-self-center ">
            <h1 className="text-center mb-3 linear-text-gradient">
             Reset Password !
            </h1>
            <form>
            <div className="input-group input-group-lg mb-3">
                <span
                  className="input-group-text fw-medium"
                  id="inputGroup-sizing-lg"
                >
                  New Password
                </span>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                  required
                  placeholder='Enter Your Password'
                  //   value={password}
                  //   onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-group input-group-lg mb-3">
                <span
                  className="input-group-text fw-medium"
                  id="inputGroup-sizing-lg"
                >
                  Confirm Password
                </span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                  required
                  placeholder='Re Enter Your Password'
                  //   value={password}
                  //   onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex flex-column  justify-content-center">
                <button
                  type="submit"
                  className="btn mt-3 fs-5 border-0 rounded-4"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
          <div className="col-12 col-md-6 px-4 py-5 order-1 overflow-auto">
            <div className="column2 rounded-4  text-center mt-md-5">
              <h1 className="display-3 py-md-4 py-5 fw-bold ">
                WildLens Tours !
              </h1>
            </div>
            <div>
              <h3 className="mt-sm-4 fs-3 lead">
              Please enter your new password and confirm it to reset your account credentials.
              </h3>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
};

export default ResetPassword;
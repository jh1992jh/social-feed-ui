import React from 'react';

const ProfileHeaderTop = ({
  showAccounts,
  onToggleShowAccounts,
  onShowAccountsOff,
  profPic,
  name,
  show
}) => {
  return (
    <div className="myProfileHeaderTop" onMouseLeave={onShowAccountsOff}>
      <div className="myProfieHeaderTopLeft">
        <div className="accounts">
          <p>{name}</p>{' '}
          <i
            className="fas fa-caret-down"
            onClick={onToggleShowAccounts}
            style={show === false ? { display: 'none' } : null}
          />
          {showAccounts === true ? (
            <div
              className="showAccounts"
              style={show === false ? { display: 'none' } : null}
            >
              <div className="showAccountsContainer">
                <div className="showAccountsContainerLeft">
                  <div className="roundedProfThumbSmall">
                    <img src={profPic} alt="profPic" />
                  </div>
                  <span className="accountName">{name}</span>
                </div>
                <div className="showAccountsContainerRight">
                  <i className="fas fa-check-circle" />
                </div>
              </div>
              <br />
              <div className="addAccount">
                <i className="fas fa-plus" /> <p>Add Account</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="myProfileHeaderTopRight">
        <i
          className="fas fa-history"
          style={show === false ? { display: 'none' } : null}
        />
        <i
          className="far fa-address-card"
          style={show === false ? { display: 'none' } : null}
        />
        <i
          className="fas fa-user-plus"
          style={show === false ? { display: 'none' } : null}
        />
        <i
          className="fab fa-facebook-square"
          style={show === false ? { display: 'none' } : null}
        />

        <i className="fas fa-ellipsis-v" />
      </div>
    </div>
  );
};

export default ProfileHeaderTop;

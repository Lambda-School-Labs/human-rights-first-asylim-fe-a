import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

function SavedCases({ savedCases, deleteBookmark }) {
  const useStyles = makeStyles(theme => ({
    grid: {
      marginTop: 15,
    },
    tbl_container: {
      display: 'flex',
      flexDirection: 'column',
      width: '57%',
      margin: 'auto',
      marginTop: 100,
      flexGrow: 1,
      position: 'relative',
      paddingRight: 30,
    },
    select: {
      margin: 70,
      height: 20,
    },
  }));
  const divStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20vh',
    width: '100%',
    flexDirection: 'column',
  };
  const h1Styles = {
    fontSize: '1.3rem',
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Case ID',
      width: 200,
      options: {
        filter: true,
      },
      //link to individual case page
      renderCell: params => (
        <>
          <Link to={`/case/${params.value}`} style={{ color: '#215589' }}>
            <span>{params.value}</span>
          </Link>
        </>
      ),
    },
    { field: 'court_type', headerName: 'Court Type', width: 105 },
    { field: 'nation_of_origin', headerName: 'Nation of Origin', width: 130 },
    { field: 'protected_ground', headerName: 'Protected Ground', width: 150 },
    { field: 'application_type ', headerName: 'Application Type ', width: 130 },
    { field: 'judge_name', headerName: 'Judge', width: 120 },
    { field: 'case_outcome', headerName: 'Decision', width: 90 },
    { field: 'case_status', headerName: 'Case Status', width: 110 },

    {
      field: 'download',
      headerName: 'Download',
      width: 120,
      renderCell: params => (
        <div>
          <a
            style={{ color: '#215589' }}
            href={`${process.env.REACT_APP_API_URI}/case/${params.value}/download-pdf`}
          >
            PDF
          </a>
          <a
            style={{ marginLeft: 20, color: '#215589' }}
            href={`${process.env.REACT_APP_API_URI}/case/${params.value}/download-csv`}
          >
            CSV
          </a>
        </div>
      ),
    },
    {
      field: 'remove_case',
      headerName: 'Remove',
      width: 110,
      renderCell: params => (
        <IconButton>
          <DeleteIcon
            onClick={() => {
              deleteBookmark(params.row.id);
            }}
          />
        </IconButton>
      ),
    },
  ];
  const classes = useStyles();
  return (
    <div className={classes.tbl_container}>
      {savedCases.length === 0 ? (
        <div style={divStyles}>
          <h1 style={h1Styles}>No Saved Cases</h1>
          <br />
          <Link to="/" style={{ color: '#3f51b5' }}>
            Return back to Home
          </Link>
        </div>
      ) : (
        // This is so the top part only displays when there are no cases, but also displays the empty table below
        <></>
      )}
      <DataGrid
        rows={savedCases}
        columns={columns}
        className={classes.grid}
        autoHeight={true}
        loading={savedCases ? false : true}
        showCellRightBorder={true}
      />
    </div>
  );
}

export default SavedCases;

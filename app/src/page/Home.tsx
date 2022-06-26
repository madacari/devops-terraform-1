import {TextField} from "@mui/material";
import {useEffect, useState} from "react";
import AddButton from "../components/AddButton";
import BasicTable, { createData, Role, Sipionaute } from "../components/BasicTable";
import DeleteButton from "../components/DeleteButton";

const Home = () => {

    const [searchField, setSearchField] = useState('');
    const [sipionautes, setSipionautes] = useState<Sipionaute[]>([]);

    useEffect(() => {
        setSipionautes([
            createData(1, 'Samy', 'Nalbandian', Role.Dev, 24, false),
            createData(2, 'Julien', 'Maring', Role.TechLead, 25, false),
            createData(3, 'Vicard', 'DU', Role.Dev, 36, false),
            createData(4, 'Martin', 'Thumel', Role.Dev, 26, false),
            createData(5, 'Jehane', 'Elidrissi', Role.PO, 26, false),
            createData(6, 'Mathieu', 'Bandelier', Role.PM, 30, true)
        ]);
    }, [])

    return (
      <div style={{height: '100%'}}>
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '32px'}}>     
              <h1>Base de données des Sipionautes</h1>
              <div style={{paddingLeft: '96px', paddingRight: '96px', display: 'flex', gap: '20px', width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <TextField onChange={(e) => setSearchField(e.target.value)}
                             label="Rechercher un Sipionaute"
                             value={searchField}
                             variant="outlined"
                             style={{width: '512px'}}
                  />
                  <div style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
                  <AddButton setSipionautes={setSipionautes} sipionautes={sipionautes}/>
                  <DeleteButton setSipionautes={setSipionautes} sipionautes={sipionautes}/>
                  </div>

              </div>
                <BasicTable sipionauteUtils={{sipionautes, setSipionautes}} filter={searchField}></BasicTable>
          </div>
      </div>
    )
}

export default Home;
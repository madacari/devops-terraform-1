import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import CheckBox from '@mui/material/Checkbox';
import Checkbox from '@mui/material/Checkbox';

export enum Role {
    TechLead = "TechLead",
    Dev = "Dev",
    PO = "PO",
    PM = "PM",
    CTO = "CTO",
    CEO = "CEO",
    GT = "GT"
}

export interface Sipionaute {
    id: number,
    firstName: string,
    lastName: string,
    role: Role,
    age: number,
    isCoach: boolean,
    checked: boolean
}

export function createData(
    id: number,
    firstName: string,
    lastName: string,
    role: Role,
    age: number,
    isCoach: boolean,
    checked: boolean = false
): Sipionaute {
    return { id, firstName, lastName, role, age, isCoach, checked };
}

export interface SipionauteUtils {
    sipionautes: Sipionaute[],
    setSipionautes: any
}

export default function BasicTable({filter, sipionauteUtils}: {filter: string, sipionauteUtils: SipionauteUtils}) {

    const selectAll = (event: any) => {
        sipionauteUtils.setSipionautes(sipionautes.map((sipionaute) => ({...sipionaute, checked: event.target.checked})));
    }

    const columns = [<Checkbox onChange={selectAll}/>, 'Prénom', 'Nom', 'Age', 'Role', 'Est coach ?'];
    const [sipionautes, setSipionautes] = useState<Sipionaute[]>([]);

    useEffect(() => {
        setSipionautes(sipionauteUtils.sipionautes);
    }, [sipionauteUtils.sipionautes]);

    const findFunction = (sipionaute: Sipionaute) => {
        const lowerFilter = filter.toLowerCase()
        return sipionaute.firstName.toLowerCase().includes(lowerFilter) ||
            sipionaute.lastName.toLowerCase().includes(lowerFilter) ||
            sipionaute.role.toLowerCase().includes(lowerFilter) ||
            sipionaute.age.toString().includes(lowerFilter) ||
            (filter === 'is:coach' && sipionaute.isCoach) ||
            (filter === 'is:not:coach' && !sipionaute.isCoach);
    }
    const updateChecked = (event: any, row: Sipionaute) => {
        const indexOfSipionaute = sipionautes.findIndex(sipionaute => sipionaute.id === row.id);
        const sipionauteBuffer = [...sipionautes];
        sipionauteBuffer[indexOfSipionaute] = {...sipionauteBuffer[indexOfSipionaute], checked: event.target.checked};
        sipionauteUtils.setSipionautes(sipionauteBuffer);
    }

    return (
        <TableContainer style={{paddingBottom: '200px'}} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map(col => <TableCell align='center'>{col}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sipionautes
                        .filter(sipionaute => findFunction(sipionaute))
                        .map((row: Sipionaute) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align={'center'}><CheckBox checked={row.checked} onChange={(event: any) => updateChecked(event, row)}/></TableCell>
                            <TableCell align={'center'}>{row.firstName}</TableCell>
                            <TableCell align="center">{row.lastName}</TableCell>
                            <TableCell align="center">{row.age}</TableCell>
                            <TableCell align="center">{row.role}</TableCell>
                            <TableCell align="center">{row.isCoach ? "✅" : "❌"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

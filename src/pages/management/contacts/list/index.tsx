/* eslint-disable prettier/prettier */
import { Grid } from '@mui/material';
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import { EditDataGrid } from 'components/Datagrid/Edit';
import { SwitchDataGrid } from 'components/Datagrid/Switch';
import { LoadingCircular } from 'components/Loading/LoadingCircular';
import MainCard from 'components/MainCard';
import { ModalDefault } from 'components/ModalDefault';
import { formateDate } from 'helpers/formateDate';
import { useEffect, useState } from 'react';
import { DefaultSession } from 'sections/Default';
import api from 'services/api';
import { SearchBar } from 'components/SearchBar';
import { NoData } from 'components/NoData';
import { FieldValues } from 'react-hook-form';
import { RemoveDataGrid } from 'components/Datagrid/Remove';
import { DataGridDefault } from 'components/Datagrid';
import { IContact } from 'types/contact/Contact';
import { contactsMock } from 'mock/contacts/list';
import FormContact from '../form';

const PageListContacts = () => {
    const [contacts, setContacts] = useState<IContact[]>([]);
    const [contactId, setContactId] = useState<number>();
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const [attPage, setAttPage] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const columns: GridColDef[] = [
        {
            field: 'typeName',
            headerName: 'Contato',
            flex: 1
        },
        {
            field: 'value',
            headerName: 'Valor',
            flex: 1
        },
        {
            field: 'description',
            headerName: 'Descrição',
            flex: 1
        },
        {
            field: 'createdAt',
            headerName: 'Criado em',
            width: 200
        },
        {
            field: 'updatedAt',
            headerName: 'Última atualização',
            flex: 1
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
                return <SwitchDataGrid params={params} urlToggle="/portfolios/toggle-active" />;
            }
        },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 100,
            renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
                return (
                    <Grid display="flex" justifyContent="space-between" width="100%" alignItems="center">
                        <EditDataGrid params={params} onClick={handleEdit} />
                        <RemoveDataGrid params={params} callBack={getRows} urlDelete="/contacts" />
                    </Grid>
                );
            }
        }
    ];

    useEffect(() => {
        getRows({});
    }, []);

    const getRows = async (data: FieldValues) => {
        setLoading(true);

        const { name, status } = data;
        const params_request = {
            ...(name && { name }),
            ...((status === 1 || status === 2) && { status: status === 1 })
        };

        try {
            const response = await api.get('/contacts', { params: params_request });

            if (response.status === 200) {
                let a_contacts: IContact[] = [];
                response.data.map((contact: IContact) => {
                    a_contacts.push({
                        id: contact.id,
                        createdAt: formateDate(contact.createdAt),
                        updatedAt: formateDate(contact.updatedAt),
                        value: contact.value,
                        status: contact.status,
                        description: contact.description,
                        isLink: contact.isLink,
                        typeName: contact.typeName
                    });
                    return 0;
                });

                setContacts(a_contacts);
            }
        } catch (error: any) {
            setContacts(contactsMock);
            console.log(error);
        }
        setLoading(false);
    };

    const handleEdit = (id: string) => {
        setContactId(+id);
        handleOpen();
    };

    const handleNew = () => {
        setContactId(0);
        handleOpen();
    };

    const handleCallbackNewCustomer = () => {
        setAttPage(!attPage);
    };

    return (
        <DefaultSession title="Listagem de contatos" handleClickNew={handleNew}>
            <Grid container justifyContent="right" pb={2}>
                <SearchBar handleCallBack={getRows} hasValue hasContactType hasStatus />
            </Grid>
            <MainCard>
                {loading ? <LoadingCircular /> : contacts.length ? <DataGridDefault rows={contacts} columns={columns} /> : <NoData />}
            </MainCard>

            <ModalDefault open={open} handleClose={handleClose}>
                <FormContact handleCallBack={handleCallbackNewCustomer} id={contactId} />
            </ModalDefault>
        </DefaultSession>
    );
};

export default PageListContacts
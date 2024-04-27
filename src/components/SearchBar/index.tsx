import { Button, MenuItem, TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SchemaSearchBar from './schema';
import Form from 'components/react-hook-form/Form';
import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';
import { IContactType } from 'types/contact/Type';
import { contactsTypeMock } from 'mock/contactsType/list';

type Props = {
  handleCallBack: (data: FieldValues) => void;
  hasName?: boolean;
  hasStatus?: boolean;
  hasTextRecommendation?: boolean;
  hasHidden?: boolean;
  hasArchived?: boolean;
  hasCategory?: boolean;
  hasNameOrEmail?: boolean;
  hasContactType?: boolean;
  hasValue?: boolean;
};

export const SearchBar = ({ handleCallBack, hasName, hasContactType, hasStatus, hasValue, hasNameOrEmail }: Props) => {
  const { handleSubmit, register, setValue } = useForm({ resolver: zodResolver(SchemaSearchBar) });

  const [contactTypes, setContactType] = useState<IContactType[]>([]);

  const handleSearch = (data: FieldValues) => {
    handleCallBack(data);
  };

  useEffect(() => {
    const getData = async () => {
      if (hasContactType) {
        setContactType(contactsTypeMock);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form handleSubmit={handleSubmit} submit={handleSearch}>
      <MainCard>
        <Grid container>
          <Grid item xs={12} sm={11}>
            <Grid container alignItems={'center'} spacing={1}>
              {hasName && (
                <Grid item xs={12} sm={4}>
                  <Stack spacing={1}>
                    <TextField fullWidth {...register('name')} placeholder="Nome" label="Nome" size="small" />
                  </Stack>
                </Grid>
              )}

              {hasNameOrEmail && (
                <Grid item xs={12} sm={4}>
                  <Stack spacing={1}>
                    <TextField fullWidth {...register('name')} placeholder="Nome" label="Nome / Email" size="small" />
                  </Stack>
                </Grid>
              )}

              {hasValue && (
                <Grid item xs={12} sm={3}>
                  <Stack spacing={1}>
                    <TextField fullWidth {...register('value')} placeholder="Ex: meuLinkedin123" label="Valor" size="small" />
                  </Stack>
                </Grid>
              )}

              {hasStatus && (
                <Grid item xs={12} sm={3} md={2}>
                  <Stack spacing={1}>
                    <FormControl sx={{ minWidth: 120 }}>
                      <Select name="status" defaultValue={0} size="small" onChange={(e) => setValue('status', e.target.value)}>
                        <MenuItem value={0}>
                          <em>Tipo de contato</em>
                        </MenuItem>
                        {contactTypes.map((contact, index) => {
                          return (
                            <MenuItem key={index} value={contact.id}>
                              {contact.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>
              )}

              {hasStatus && (
                <Grid item xs={12} sm={3} md={2}>
                  <Stack spacing={1}>
                    <FormControl sx={{ minWidth: 120 }}>
                      <Select name="status" defaultValue={0} size="small" onChange={(e) => setValue('status', e.target.value)}>
                        <MenuItem value={0}>
                          <em>Status</em>
                        </MenuItem>
                        <MenuItem value={1}>Ativo</MenuItem>
                        <MenuItem value={2}>Inativo</MenuItem>
                        <MenuItem value={3}>Todos</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>
              )}

              <Grid item xs={12} sm={2} md={1.5}>
                <Button variant="contained" fullWidth type="submit">
                  <SearchIcon /> Search
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </Form>
  );
};

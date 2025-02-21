import React, { useEffect, useState } from 'react';
import { Header } from './components/header';
import { Container, ContainerRow } from './styles';
import { Sidebar } from './components/sidebar';
import SidebarActions from './components/sidebarActions';
import DynamicTable from './components/dynamicTable';
import { useTemplate } from '../../services';
import { useSearchParams } from 'react-router-dom';
import { Footer } from './components/footer';

export const AdminPage = () => {
    const [selectedPhone, setSelectedPhone] = useState<string>('');
    const [isSidebarActionsOpen, setIsSidebarActionsOpen] = useState<boolean>(false);
    const { getTemplate, getRespuestaRapida, getProductsToPni, getStore, getResponse, } = useTemplate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [loaderService, setLoaderService] = useState(false);
    const [tableHeader, setTableHeader] = useState([]);

    const handleCardClick = (phone: string) => {
        setSelectedPhone(phone);
        setIsSidebarActionsOpen(true);
    };

    useEffect(() => {
        switch (searchParams.get('acc')) {
            case '1':
                getTemplate(searchParams.get('id') || 1);
                break;
            case '2':
                getRespuestaRapida(searchParams.get('id') || 1);
                break;
            case '4':
                getProductsToPni(searchParams.get('id') || 1);
                break;

            default:
                break;
        }
    }, [searchParams, loaderService]);

    const CONFIG_TABLE = {
        postURL: 'template/create',
        editURL: 'template/update',
        deleteURL: 'template/update'
    };

    return (
        <Container>
            <Header />
            <ContainerRow>
                <Sidebar onCardClick={handleCardClick} />
                {searchParams.get('id') && <SidebarActions isOpen={isSidebarActionsOpen} selectedPhone={selectedPhone} />}
                {searchParams.get('acc') && <DynamicTable data={getResponse} setLoaderService={setLoaderService} {...CONFIG_TABLE} />}
            </ContainerRow>
            <Footer />
        </Container>
    );
};
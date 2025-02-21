import { Button } from "primereact/button";
import { TieredMenu } from "primereact/tieredmenu";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Dialog } from "primereact/dialog";
import FormPlantilla from "./components/forms/form-plantilla";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";

import { useTemplate } from "../../../../services/template/template.service";
import FormRespuesta from "./components/forms/form-respuesta";
import FormTienda from "./components/forms/form-tienda";
import FormProducts from "./components/forms/form-products";
import LoaderComponent from "../pages/chat/components/loader";
import { useChatContext } from "pages/chat/context/chat";
import useWindowSize from "../../../chat/hooks/useWindowSize";
import { Tooltip } from "primereact/tooltip";
import Cookies from 'js-cookie';
import { StyledDialog } from './styles';

const TableContainer = styled.div<{ isOpen: boolean }>`
  height: 83vh;
  grid-column: span 7 / span 7;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: auto;
  position: relative;
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    background: white;
    left: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
  }

  ${({ isOpen }) => !isOpen && `grid-column: span 9 / span 9;`}

  > div {
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
      flex-direction: column;
      overflow: auto;
    }
    > input {
      width: 50%;
      padding: 10px;
      border: 1px solid #f0f0f0;
      border-radius: 5px;
      margin-bottom: 20px;
      @media (max-width: 768px) {
        width: 100%;
      }
    }

    > button {
      width: fit-content;
      background-color: #2D2E83;
      color: white;
      border: none;
      border-radius: 10px;
      padding: 5px 20px;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      transition: background-color 0.3s;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      margin-bottom: 20px;
      @media (max-width: 768px) {
        width: 100%;
        justify-content: center;
        padding: 12px;
      }
      span {
        margin-left: 10px;
      }

      &:hover {
        background-color: #3C58A4;
      }
    }
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeaderCell = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
  font-size: 13px;
`;

const TableRow = styled.tr`
  position: relative;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 13px;
`;

const PaginationContainer = styled.div`
  padding-bottom: 30px;
  display: flex;
  justify-content: center !important;
  align-items: center;
  margin-top: 10px;
  @media (max-width: 768px) {
          flex-direction: row !important;
  }
  button {
    background-color: transparent !important;
    color: #2D2E83 !important;
    font-weight: bold;
    box-shadow: none !important;
    margin-bottom: 0px !important;
  }
`;

interface DynamicTableProps<T> {
  data: T[];
  postURL: string;
  editURL: string;
  deleteURL: string;
  setLoaderService: (data: boolean) => void;
}

const DynamicTable = <T extends { id: number }>({
  data,
  setLoaderService,
}: DynamicTableProps<T>) => {
  const headers = data.length > 0 ? Object.keys(data[0]).slice(1) : [];
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataAction, setDataAction] = useState<any>({});
  const { putDeleteTemplate, putDeleteRespuesta, putDeleteStore, putDeleteProduct,
    postDuplicateTemplate, postDuplicateRespuesta, postDuplicateStore, postDuplicateProduct
  } = useTemplate();
  const [hasChange, setHasChange] = useState(false);

  const itemsPerPage = 10;
  const menuRef = React.useRef<any>(null);
  const [visible, setVisible] = useState(false);
  const [dataForm, setDataForm] = useState({ action: "", data: null });
  const { setShowMessageDialog } = useChatContext();
  const isDesktop = useWindowSize();

  const filteredData = data
    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .filter((item) =>
      headers.some((header) =>
        String((item as any)[header])
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleMenuClick = (event: React.MouseEvent, row: any) => {
    event.preventDefault();

    setDataAction(row);
    menuRef.current?.toggle(event);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yy hh:mm a", { locale: es });
  };

  const onOpenForm = () => {
    setDataForm({ action: "", data: null });
    setVisible(true);
  };

  const onCloseModal = () => {
    setShowMessageDialog(false);
    setVisible(false);
  };

  useEffect(() => {
    setHasChange(true);

    setTimeout(() => setHasChange(false), 500);
  }, [searchParams.get("acc")]);

  const onDeleteUser = async (userID: any) => {
    setLoaderService(true);
    switch (searchParams.get("acc")) {
      case "1":
        await putDeleteTemplate(userID);

        break;
      case "2":
        await putDeleteRespuesta(userID);

        break;
      case "3":
        await putDeleteStore(userID);

        break;
      case "4":
        await putDeleteProduct(userID);
        break;
      default:
        break;
    }

    setLoaderService(false);
  };

  const confirmDeleteUser = (userID: any) => {
    const targetElementModal = document.querySelector(`#row_${userID}`) as HTMLElement;

    confirmPopup({
      className: "dialog_table",
      appendTo: targetElementModal as HTMLElement,
      message: "¿Estás seguro de eliminar la plantilla?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: 'SI',
      rejectLabel: 'NO',
      accept: () => {
        onDeleteUser(userID);
      },
      reject: () => { },
    });
  };

  interface Item {
    id: number;
    [key: string]: any;
  }

  const getMaxId = (items: Item[]): number => {
    return items.reduce((maxId, item) => (item.id > maxId ? item.id : maxId), 0);
  };

  const appendCopia = (input: string): string => {
    return `${input} copia ${getMaxId(paginatedData) + 1}`;
  };

  const onDuplicateData = async (data: any) => {
    setLoaderService(true);
    const dataID = Number(searchParams.get("id"))
    const phoneID = Number(searchParams.get("phone"))
    const storedId = Cookies.get('authId');

    switch (searchParams.get("acc")) {
      case "1":
        await
          postDuplicateTemplate({
            id: dataID,
            code: appendCopia(data.code),
            name: appendCopia(data.name),
            text: appendCopia(data.text),
            templateType: (data.templateType),
          })

        break;
      case "2":
        await

          postDuplicateRespuesta({
            id: dataID,
            keyword: appendCopia(data.keyword),
            templateType: data.templateType,
            upsellVideo: appendCopia(data.upsellVideo),
            upsellTextVideo: appendCopia(data.upsellTextVideo),
            upsellText: appendCopia(data.upsellText),
            upsellImage: appendCopia(data.upsellImage),
            isConfirmed: data.isConfirmed,
            isInformative: data.isInformative,
          })

        break;
      case "3":
        await
          postDuplicateStore({
            name: appendCopia(data.name),
            userAlibot: appendCopia(data.userAlibot),
            code: appendCopia(data.code),
            storeDomain: appendCopia(data.storeDomain),
            phoneNumberId: Number(dataID),
            accountUserId: storedId
          })

        break;
      case "4":
        await
          postDuplicateProduct({
            storedId: data.storeId,
            name: appendCopia(data.name),
            storeId: data.storeId,
            prompt: data.prompt,
            temperature: data.temperature,
            maxTokens: data.maxTokens,
            id: dataID,
          })
        break;
      default:
        break;
    }
    setLoaderService(false);

  };

  const items = [
    {
      label: "Editar",
      icon: "pi pi-user-edit",
      command: () => {
        setVisible(true);
        setDataForm({ action: "edit", data: dataAction });
      },
    },
    {
      label: "Eliminar",
      icon: "pi pi-trash",
      command: () => confirmDeleteUser(dataAction.id),
    },
    {
      label: "Duplicar",
      icon: "pi pi-copy",
      command: () => onDuplicateData(dataAction),
    },
  ];

  const changeWord = (word: string) => {
    switch (word) {
      case "name":
        return "Nombre";
      case "code":
        return "Código";
      case "templateType":
        return "Plantilla";
      case "text":
        return "Texto";
      case "createdAt":
        return "Creado";
      case "keyword":
        return "Palabra clave";

      case "upsellImage":
        return "Url Imagen";
      case "upsellText":
        return "Texto";
      case "upsellVideo":
        return "Url Video";
      case "storeDomain":
        return "Tienda Shopify";
      case "upsellTextVideo":
        return "Texto de video";
      case "userAlibot":
        return "Usuario Alibot";
      case "isConfirmed":
        return "Confirmado";

      case "isInformative":
        return "Informativo";

      case "prompt":
        return "Prompt";

      case "temperature":
        return "Temperatura";

      case "maxTokens":
        return "Máx. tokens";

      case "storeName":
        return "Tienda";
      default:
        break;
    }
  };

  const formatTable = (text: any) => {
    if (text?.length > 20) {
      return (
        <>
          <Tooltip target=".more_detail" position={"left"} className="more_detail_tool" />
          <p className="more_detail" data-pr-tooltip={text}>
            {text.slice(0, 20) + "..."}
          </p>
        </>
      );
    }

    return text;
  };

  const onToggleAction = () => {
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.set('id', searchParams.get('id') ?? '');
    updatedParams.set('phone', searchParams.get('phone') ?? '');

    updatedParams.delete('acc');

    setSearchParams(updatedParams, { replace: true });
  };

  const truncateToTenChars = (value: string): string => {
    return value.length > 40 ? value.substring(0, 40) + "…" : value;
  };

  const formatDateCell = (date: string): string => {
    const formattedDate = new Date(date).toLocaleDateString();
    return `<span>${truncateToTenChars(formattedDate)}</span>`; // Aplica la truncación
  };

  const formatTableCell = (value: any): string => {
    const displayValue =
      typeof value === "object" && value !== null
        ? JSON.stringify(value)
        : String(value);

    return `<span>${truncateToTenChars(displayValue)}</span>`; // Aplica la truncación
  };


  return (
    <TableContainer isOpen={!searchParams.get("acc")}>
      {!isDesktop && <div className="actionsReturn">
        <button onClick={() => onToggleAction()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>}

      <h2 style={{ fontSize: "16px", marginBottom: "10px" }}>
        <strong>Usando:</strong> {searchParams.get("phone")}
      </h2>
      <div>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => onOpenForm()} icon="pi pi-plus-circle" iconPos="left">
          Agregar Nuevo
        </Button>
      </div>
      <div className="divTable">
        <StyledTable>
          <thead>
            <tr>
              {headers.map((header) => (
                <TableHeaderCell key={header}>{changeWord(header)}</TableHeaderCell>
              ))}
              <TableHeaderCell>Acciones</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} id={`row_${row.id}`}>
                {headers.map((header) => (
                  <TableCell key={header}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          header === "createdAt"
                            ? formatDateCell((row as any)[header])
                            : formatTableCell((row as any)[header]),
                      }}
                    />
                  </TableCell>

                ))}
                <TableCell onClick={() => setShowMessageDialog(true)}>
                  <Button
                    icon="pi pi-ellipsis-v"
                    onClick={(e: any) => handleMenuClick(e, row)}
                    className="p-button-text"
                  />
                  <TieredMenu model={items} ref={menuRef} popup id="menu" />
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </div>

      {filteredData.length > itemsPerPage && (
        <PaginationContainer>
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Anterior
          </Button>
          <p style={{ display: 'flex' }}>
            <span>{currentPage} </span> <span>/ </span><span>{Math.ceil(filteredData.length / itemsPerPage)}</span>
          </p>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
          >
            Siguiente
          </Button>
        </PaginationContainer>
      )}

      <StyledDialog
        visible={visible}
        onHide={onCloseModal}
        style={{ width: '30vw', borderRadius: '15px', overflow: 'hidden' }}
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      >
        {searchParams.get("acc") === "1" ? (
          <FormPlantilla
            dataEdit={dataForm}
            id={searchParams.get("id") || "1"}
            closeModal={onCloseModal}
            setLoaderService={setLoaderService}
            isDeletingUser={false}
          />
        ) : searchParams.get("acc") === "2" ? (
          <FormRespuesta
            dataEdit={dataForm}
            id={searchParams.get("id") || "2"}
            closeModal={onCloseModal}
            setLoaderService={setLoaderService}
            isDeletingUser={false}
          />
        ) : searchParams.get("acc") === "3" ? (
          <FormTienda
            dataEdit={dataForm}
            id={searchParams.get("id") || "2"}
            closeModal={onCloseModal}
            setLoaderService={setLoaderService}
            isDeletingUser={false}
          />
        ) : (
          <FormProducts
            dataEdit={dataForm}
            id={searchParams.get("id") || "2"}
            closeModal={onCloseModal}
            setLoaderService={setLoaderService}
            isDeletingUser={false}
          />
        )}
      </StyledDialog>

      {hasChange && <LoaderComponent />}
    </TableContainer>
  );
};

export default DynamicTable;

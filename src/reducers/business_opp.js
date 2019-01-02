
const initialState = {
    boItem: {},
    listBO: [],
    boType: [],
    lstCrp: [],
    lstSale: [],
    lstSaleAdmin: [],
    lstTransType: [],
    lstCurrency: [],
    lstFieldType: [],
    lstMerchandise: [],
    inputResource: [],
    lstBusiness: [],
    lstLinkBO: [],
    lstSaleTask: [],
    lstPicBO: [],
    lstTransPhaseBO: [],
    listConnectiveModal: [],
    lstConnectionType: [],
    lsSerStartEndPlace: [],
    lstTransMethod: [],
    lstTransForm: [],
    lstInconterm: [],
    lstContType: [],
    lstPlaceType: [],
    lstPlaceSelectByPage: [],
    listInboundRoute: [],
    listOutboundRoute: [],
    listRouteEnd: [],
    listProviderByID: [],
    listProviderByIDModal: [],
    listAllProvider: [],
    transPhaseData: [],
    lstSaleJob: [],
    lstProdTypeSelect: [],
    actionName: '',
    countUpdate: 0,
    countDelete: 0,
    countDeletePic: 0,
    countDeleteLink: 0,
    countDeleteRouter: 0,
    countDeletePhase: 0,
    countRemove: 0,
    countRestore: 0,
    countFetchPage: 0,
    countFetchById: 0,
    countFetchPicBO: 0,
    countFetchCrpBO: 0,
    countFetchLinkBO: 0,
    countFetchSaleTaskBO: 0,
    countFetchTransPhaseBO: 0,
    countFetchTransRoute: 0,
    countFetchRouteEnd: 0,
    countGetListProvider: 0,
    countGetListProviderModal: 0,
    countUpdatePicSale: 0,
    countFetchTransPhase: 0,
    countFetchBoType: 0,
    countFetchPlaceType: 0,
    countGetAllListProvider: 0,
    countDeleteImg: 0,
    countFetchLstCon: 0,
    countFetchCurrency: 0,
    countFetchSetSale: 0,
    success: false,
    lastSearchObj: null,
    msg: '',
    data: null,
}
const bo = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'LIST_BO_PAGINATION':
            return {
                ...state, listBO: action.data.data ? action.data.data : [], success: action.data.success,
                countFetchPage: state.countFetchPage + 1
            }
        case 'GET_BO_BY_ID':
            return {
                ...state, boItem: action.data.data ? action.data.data : {},
                success: action.data.success, msg: action.data.msg, countFetchById: state.countFetchById + 1,
                // lstContactProvider: action.data.data ? action.data.data.list_pic : []
            }
        case 'GET_ALL_BO_TYPE':
            return { ...state, boType: action.data.data ? action.data.data : [], countFetchBoType: state.countFetchBoType + 1, }
        case 'GET_BO_SELECT_BY_PAGE':
            return {
                ...state, listConnectiveModal: action.data.data ? action.data.data : [], success: action.data.success,
            }
        case 'GET_PLACE_SELECT_BY_PAGE':
            return {
                ...state, lstPlaceSelectByPage: action.data.data ? action.data.data : [], success: action.data.success,
            }
        case 'GET_ALL_INPUT_RESOURCE':
            return { ...state, inputResource: action.data.data ? action.data.data : [], }
        case 'INSERT_BO':
            return { ...state, actionName: 'insert', countUpdate: state.countUpdate + 1, data: action.data.data ? action.data.data : undefined, }
        case 'APPROVE_BO':
            return { ...state, actionName: 'approve', countUpdate: state.countUpdate + 1, }
        case 'UPDATE_STATUS_BO':
            return { ...state, actionName: 'updateStatus', countUpdate: state.countUpdate + 1, }
        case 'UPDATE_SALE_STATUS_BO':
            return { ...state, actionName: 'updateSaleStatus', countUpdate: state.countUpdate + 1, }
        case 'UPDATE_BO':
            return { ...state, actionName: 'update', countUpdate: state.countUpdate + 1, }
        case 'FETCH_ALL_TRANSPORT_TYPE':
            return { ...state, lstTransType: action.data.data ? action.data.data : [], }
        case 'GET_SALE_JOB_BO':
            return { ...state, lstSaleJob: action.data.data ? action.data.data : [], }
        case 'FETCH_TRANS_PHASE_BY_ID':
            return {
                ...state, transPhaseData: action.data.data ? action.data.data : [], success: action.data.success, countFetchTransPhase: state.countFetchTransPhase + 1,
            }
        case 'FETCH_BOUND_TRANS':
            return {
                ...state, listInboundRoute: action.data.data ? action.data.data.lstInbound : [],
                listOutboundRoute: action.data.data ? action.data.data.lstOutbound : [], countFetchTransRoute: state.countFetchTransRoute + 1,
            }
        case 'FETCH_TRANS_ROUTE_END':
            return {
                ...state, listRouteEnd: action.data.data ? action.data.data : [], countFetchRouteEnd: state.countFetchRouteEnd + 1,
            }
        case 'GET_PROVIDER_LIST_BY_ID':
            return {
                ...state, listProviderByID: action.data.data ? action.data.data : [], countGetListProvider: state.countGetListProvider + 1,
            }
        case 'GET_PROVIDER_LIST_BY_ID_MODAL':
            return {
                ...state, listProviderByIDModal: action.data.data ? action.data.data : [], countGetListProviderModal: state.countGetListProviderModal + 1,
            }
        case 'GET_ALL_LIST_PROVIDER':
            return {
                ...state, listAllProvider: action.data.data ? action.data.data.results : [], countGetAllListProvider: state.countGetAllListProvider + 1,
            }
        case 'FETCH_ALL_CURRENCY':
            return { ...state, lstCurrency: action.data.data ? action.data.data : [], countFetchCurrency: state.countFetchCurrency + 1, }
        case 'FETCH_ALL_FIELD_TYPE':
            return { ...state, lstFieldType: action.data.data ? action.data.data : [], }
        case 'FETCH_ALL_MERCHANDISE':
            return { ...state, lstMerchandise: action.data.data ? action.data.data : [], }
        case 'FETCH_ALL_BUSINESS':
            return { ...state, lstBusiness: action.data.data ? action.data.data : [], }
        case 'FETCH_ALL_SALE':
            return { ...state, lstSale: action.data.data ? action.data.data : [], }
        case 'GET_ALL_SERVICE_START_END_PLACE':
            return { ...state, lsSerStartEndPlace: action.data.data ? action.data.data : [], }
        case 'FETCH_ALL_SALE_ADMIN':
            return { ...state, lstSaleAdmin: action.data.data ? action.data.data : [], }
        case 'FETCH_ALL_TRANS_METHOD':
            return { ...state, lstTransMethod: action.data.data ? action.data.data : [], }
        case 'FETCH_ALL_INCOTERM':
            return { ...state, lstInconterm: action.data.data ? action.data.data : [], }
        case 'FETCH_ALL_CONT_TYPE':
            return { ...state, lstContType: action.data.data ? action.data.data : [], }
        case 'FETCH_ALL_PLACE_TYPE':
            return { ...state, lstPlaceType: action.data.data ? action.data.data : [], countFetchPlaceType: state.countFetchPlaceType + 1, }
        case 'FETCH_ALL_TRANS_FORM':
            return { ...state, lstTransForm: action.data.data ? action.data.data : [], }
        case 'FETCH_ALL_PROD_TYPE_SELECT':
            return { ...state, lstProdTypeSelect: action.data.data ? action.data.data : [], }
        case 'FETCH_ALL_CONNECTION_TYPE':
            return { ...state, lstConnectionType: action.data.data ? action.data.data : [], countFetchLstCon: state.countFetchLstCon + 1, }
        case 'GET_ALL_LINK_BO_ID':
            return { ...state, lstLinkBO: action.data.data ? action.data.data : [], countFetchLinkBO: state.countFetchLinkBO + 1, }
        case 'GET_ALL_SALE_TASK_ID':
            return { ...state, lstSaleTask: action.data.data ? action.data.data : [], countFetchSaleTaskBO: state.countFetchSaleTaskBO + 1, }
        case 'GET_ALL_PIC_BO_ID':
            return { ...state, lstPicBO: action.data.data ? action.data.data : [], countFetchPicBO: state.countFetchPicBO + 1, }
        case 'GET_ALL_CRP_BY_BO_ID':
            return { ...state, lstCrpBO: action.data.data ? action.data.data : [], countFetchCrpBO: state.countFetchCrpBO + 1, }
        case 'GET_ALL_TRANS_PHASE_BY_BO_ID':
            return { ...state, lstTransPhaseBO: action.data.data ? action.data.data : [], countFetchTransPhaseBO: state.countFetchTransPhaseBO + 1, }
        case 'DELETE_BO':
            return { ...state, success: action.data.success, msg: action.data.msg, countDelete: state.countDelete + 1, }
        case 'DELETE_TRANS_ROUTE':
            return { ...state, success: action.data.success, msg: action.data.msg, countDeleteRouter: state.countDeleteRouter + 1, }
        case 'DELETE_TRANS_PHASE':
            return { ...state, success: action.data.success, msg: action.data.msg, countDeletePhase: state.countDeletePhase + 1, }
        case 'DELETE_PIC_BO':
            return { ...state, success: action.data.success, msg: action.data.msg, countDeletePic: state.countDeletePic + 1, }
        case 'DELETE_LINK_BO':
            return { ...state, success: action.data.success, msg: action.data.msg, countDeleteLink: state.countDeleteLink + 1, }
        case 'CHANGE_PIC_SALE_BO':
            return { ...state, success: action.data.success, msg: action.data.msg, countUpdatePicSale: state.countUpdatePicSale + 1, }
        case 'REMOVE_BO':
            return { ...state, success: action.data.success, msg: action.data.msg, countRemove: state.countRemove + 1, }
        case 'RESTORE_BO':
            return { ...state, success: action.data.success, msg: action.data.msg, countRestore: state.countRestore + 1, }
        case 'SET_SALE_BO':
            return { ...state, success: action.data.success, msg: action.data.msg, countFetchSetSale: state.countFetchSetSale + 1, }
        case 'DELETE_ROW_IMAGE_BO':
            return { ...state, success: action.data.success, msg: action.data.msg, countDeleteImg: state.countDeleteImg + 1, actionName: 'deleteImage', }
        case 'SET_LAST_SEARCH_BO':
            return { ...state, lastSearchObj: action.data, }
        case 'RESET_BO':
            return state = initialState;
        default:
            return state;
    }
}
export default bo
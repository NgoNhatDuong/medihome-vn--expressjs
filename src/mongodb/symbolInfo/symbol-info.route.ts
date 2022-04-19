import { Router } from 'express'
import SymbolInfoController from './symbol-info.controller'

export default class SymbolInfoRoute {
    public router = Router()

    public symbolInfoController = new SymbolInfoController()

    constructor() {
        this.initializeRoute()
    }

    private initializeRoute() {
        this.router.get('/symbol-info/list', this.symbolInfoController.list)
    }
}

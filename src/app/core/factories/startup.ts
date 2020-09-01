import { StartupService } from '../services/startup.service';

export function startupServiceFactory(startupService: StartupService) {
    return (): Promise<any> => {
        return startupService.load();
    };
}

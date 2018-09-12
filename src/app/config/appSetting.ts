import { environment } from '../../environments/environment';
export const AppSetting: AppSettingType = {
    awsServiceUrl: 'http://ec2-13-126-16-163.ap-south-1.compute.amazonaws.com:3021/',
    local3021CrmServiceUrl: 'http://localhost:3021/',
<<<<<<< HEAD
    serviceUrl: 'http://localhost:3021/'
    // serviceUrl: 'https://rinteger.com/adminservice/',
=======
    serviceUrl: environment.serviceUrl
>>>>>>> 3f4ca9caad89f238710afa60c92bc9a0f149c2e7
};

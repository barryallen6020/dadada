
import React from 'react';
import EmailCampaignTable from '../EmailCampaignTable';
import { EmailCampaign } from '../types';

interface CampaignsTabProps {
  campaigns: EmailCampaign[];
  onViewReport: (campaign: EmailCampaign) => void;
  onDuplicate: (campaign: EmailCampaign) => void;
  onExportData: (campaign: EmailCampaign) => void;
}

const CampaignsTab: React.FC<CampaignsTabProps> = ({
  campaigns,
  onViewReport,
  onDuplicate,
  onExportData
}) => {
  return (
    <EmailCampaignTable
      campaigns={campaigns}
      onViewReport={onViewReport}
      onDuplicate={onDuplicate}
      onExportData={onExportData}
    />
  );
};

export default CampaignsTab;

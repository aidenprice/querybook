import { ContentState } from 'draft-js';
import React from 'react';
import { useSelector } from 'react-redux';

import hiveTypeInfo from 'config/type_info.yaml';
import { prettyPrintType } from 'lib/utils/complex-types';
import { IStoreState } from 'redux/store/types';

import { PanelSection, SubPanelSection } from './PanelSection';

interface IColumnPanelViewProps {
    columnId: number;
}

export const ColumnPanelView: React.FunctionComponent<
    IColumnPanelViewProps
> = ({ columnId }) => {
    const column = useSelector(
        (state: IStoreState) => state.dataSources.dataColumnsById[columnId]
    );

    const overviewPanel = (
        <PanelSection title="column">
            <SubPanelSection title="name">{column.name}</SubPanelSection>
            <SubPanelSection title="type">
                <div className="preformatted">
                    {prettyPrintType(column.type)}
                </div>
            </SubPanelSection>
        </PanelSection>
    );

    const descriptionPanel = (
        <PanelSection title="description" hideIfNoContent>
            {column.description
                ? (column.description as ContentState).getPlainText()
                : '-'}
        </PanelSection>
    );

    const typeInfo = hiveTypeInfo[column.type];
    const typeInfoPanel = typeInfo ? (
        <PanelSection title="type info">{typeInfo}</PanelSection>
    ) : null;

    return (
        <>
            {overviewPanel}
            {descriptionPanel}
            {typeInfoPanel}
        </>
    );
};

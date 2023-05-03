import { ChipField, ReferenceArrayField, ReferenceArrayFieldProps, SingleFieldList } from "react-admin"

const RefArrayField = (props: ReferenceArrayFieldProps) => {
    return (
        <ReferenceArrayField
            sx={{
                minWidth: "200px",
                maxWidth: "500px",
                ".MuiChip-label::first-letter": {
                    textTransform: "capitalize"
                },
            }}
            emptyText='No record found'
            {...props}
        >
            <SingleFieldList>
                <ChipField source='label' size='small' />
            </SingleFieldList>
        </ReferenceArrayField>
    )
}

export default RefArrayField
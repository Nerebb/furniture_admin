import { BooleanField, DateField, DeleteButton, EditButton, TopToolbar, useRecordContext } from "react-admin"
import { Avatar, Box, Card, CardContent, Stack, Typography } from "@mui/material"
import { UserVerification } from ".."
import { User } from "@prisma/client"

const UserDetail = () => {
    const record = useRecordContext<User>()
    return (
        <Card
            sx={{ maxWidth: 800, margin: 'auto' }}
        >
            <CardContent>
                <Stack gap={1}>
                    {/* BasicInfo */}
                    <Stack direction='row' justifyContent='space-between' >
                        <Box>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {record.id}
                            </Typography>
                            <Stack
                                direction='row'
                                gap={1}
                            >
                                {record.image ? (
                                    <Avatar alt={record.name || ""} src={record.image[0]} />
                                ) : (
                                    <Avatar sx={{ width: 30, height: 30, fontSize: 20 }}>{record.name?.substring(0, 1).toUpperCase() || "N"}</Avatar>
                                )}
                                <Typography variant="h5" sx={{ ":first-letter": { textTransform: 'capitalize' } }}>{record.name} ({record.nickName})</Typography>
                            </Stack>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                Phone number: {record.phoneNumber}
                            </Typography>
                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                Birthday:
                                <DateField source="birthDay" fontSize={16} />
                            </Typography>
                        </Box>
                        <Box>
                            {UserVerification.map(i => (
                                <Stack key={`${i.id}`} direction='row' alignItems='center' justifyContent='space-between'>
                                    <Typography>{`${i.label}:`}</Typography>
                                    {record[i.reference] ? (
                                        <DateField source={i.reference} showDate showTime={false} />
                                    ) : (
                                        <BooleanField source={i.reference} looseValue />
                                    )}
                                </Stack>
                            ))}
                        </Box>
                    </Stack>
                    <Typography>Address: {record.address}</Typography>
                    {/* Actions */}
                    <TopToolbar>
                        <EditButton />
                        <DeleteButton />
                    </TopToolbar>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default UserDetail
import React from 'react'
import { Document, Page, View, Text, Image } from '@react-pdf/renderer'

export const PDF = ({ }) => {
    return (
        <Document>
            <Page size={'A4'}>
                <View
                    style={
                        {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    }
                />

                    <Text>
                        Hola
                    </Text>

            </Page>
        </Document>
    )
}

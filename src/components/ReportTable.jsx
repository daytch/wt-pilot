import React from "react";
import {
  PDFViewer,
  Page,
  View,
  Text,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";
import { convertDate } from "../functions/index.js";

const ReportTable = (props) => {
  const { listsurat } = props;

  const HeaderTable = () => (
    <View
      style={{
        flexDirection: "row",
        // justifyContent: "space-between",
        fontSize: 12,
      }}
    >
      <View style={{ flexDirection: "column", width: 80, marginRight: 3 }}>
        <Text>No Surat</Text>
      </View>

      <View style={{ flexDirection: "column", width: 60, marginRight: 1 }}>
        <Text>Tujuan</Text>
      </View>

      <View style={{ flexDirection: "column", width: 165, marginRight: 1 }}>
        <Text>Subject</Text>
      </View>

      <View style={{ flexDirection: "column", width: 75, marginRight: 1 }}>
        <Text>Pengirim</Text>
      </View>

      <View style={{ flexDirection: "column", width: 65, marginRight: 1 }}>
        <Text>Tanggal Kirim</Text>
      </View>

      <View style={{ flexDirection: "column", width: 65, marginRight: 1 }}>
        <Text>Tanggal Selesai</Text>
      </View>

      <View style={{ flexDirection: "column", width: 60, marginRight: 1 }}>
        <Text>Status</Text>
      </View>
    </View>
  );
  // eslint-disable-next-line react/prop-types
  const BodyTable = ({
    no_surat,
    tujuan,
    subject,
    pengirim,
    tgl_kirim,
    tgl_selesai,
    status,
  }) => (
    <View
      style={{
        flexDirection: "row",
        // justifyContent: "space-between",
        fontSize: 10,
      }}
    >
      <View style={{ flexDirection: "column", width: 80, marginRight: 3 }}>
        <Text>{no_surat}</Text>
      </View>

      <View style={{ flexDirection: "column", width: 60, marginRight: 1 }}>
        <Text>{tujuan}</Text>
      </View>

      <View style={{ flexDirection: "column", width: 165, marginRight: 1 }}>
        <Text>{subject}</Text>
      </View>

      <View style={{ flexDirection: "column", width: 75, marginRight: 1 }}>
        <Text>{pengirim}</Text>
      </View>

      <View style={{ flexDirection: "column", width: 65, marginRight: 1 }}>
        <Text>{tgl_kirim}</Text>
      </View>

      <View style={{ flexDirection: "column", width: 65, marginRight: 1 }}>
        <Text>{tgl_selesai}</Text>
      </View>

      <View style={{ flexDirection: "column", width: 60, marginRight: 1 }}>
        <Text>{status}</Text>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 20,
    },
    header: {
      display: "flex",
      flexDirection: "column",
    },
  });

  return (
    <div
      id="hs-medium-modal"
      className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
    >
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-2xl md:w-full m-3 h-[calc(100%-3.5rem)] md:mx-auto lg:max-w-4xl lg:w-full lg:mx-auto">
        <div className="max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-white">Laporan</h3>
            <button
              type="button"
              className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
              data-hs-overlay="#hs-medium-modal"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3.5 h-3.5"
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto">
            <PDFViewer className="lg:w-[54rem] h-[70vh] w-[80vw]">
              <Document>
                <Page style={styles.body}>
                  {/* <View style={styles.header}>
                    <View style={styles.project}>
                      <Text style={styles.labelProject}>Project:</Text>
                      <Text style={styles.projectName}>
                         {project.projectName} 
                      </Text>
                    </View>
                    <View style={styles.projRep}>
                      <Text style={styles.labelProjRep}>
                        Project Representation:
                      </Text>
                      <Text style={styles.projRepName}>
                        {projectRepresentation.projectRepresentationName}
                      </Text>
                    </View>
                  </View>
 */}
                  {/* {showHeader && Header("Equipment Replacement By Cost Centre")} */}

                  <View style={{ marginTop: 35 }}>
                    <HeaderTable />
                    {listsurat.map((item, idx) => {
                      return (
                        <BodyTable
                          key={idx}
                          no_surat={item.no_surat}
                          tujuan={item.tujuan}
                          subject={item.judul}
                          pengirim={item.nama}
                          tgl_kirim={convertDate(item.createdAt)}
                          tgl_selesai={
                            item.tgl_selesai
                              ? convertDate(item.tgl_selesai)
                              : "-"
                          }
                          status={item.status}
                        />
                      );
                    })}
                  </View>
                </Page>
              </Document>
            </PDFViewer>
          </div>
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
            <button
              type="button"
              className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              data-hs-overlay="#hs-medium-modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ReportTable.propTypes = {
  listsurat: PropTypes.array,
};

export default ReportTable;

import { Button, Card, Col, Empty, Flex, Input, Row, Select, Switch, Tag, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import usePagination from "./hooks/usePagination";
import { StatusesEnum } from "../../types/StatusesEnum";
import { toggleTaskStatus } from "../../features/slices/tasksSlice";
import useFilteredTasks from "./hooks/useFilteredTasks";
import classes from "./UserTasksTable.module.scss";
import { NotificationContext } from "../../context/NotificationContextProvider";
import { useTranslation } from "react-i18next";

const UserTasks = () => {
  const [titleFilter, setTitleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusesEnum | null>(null);
  const [ownerFilter, setOwnerFilter] = useState<number | null>(null);
  const { tasks, isLoading } = useAppSelector((state) => state.tasks);
  const users = useAppSelector((state) => state.userInfo.users);
  const dispatch = useAppDispatch();
  const filteredTasks = useFilteredTasks(tasks, titleFilter, statusFilter, ownerFilter);
  const {
    paginatedTasks,
    totalPages,
    currentPage,
    handleNextPage,
    handlePrevPage,
    setCurrentPage,
  } = usePagination(filteredTasks);
  const { notification } = useContext(NotificationContext);
  const { t } = useTranslation();

  useEffect(() => {
    setCurrentPage(1);
  }, [titleFilter, statusFilter, ownerFilter, setCurrentPage]);

  return (
    <>
      <Typography.Title className={classes.title}>{t("titles.tasks")}</Typography.Title>
      <Row gutter={[16, 16]} className={classes.filterContainer}>
        <Col xs={4}>
          <Typography.Text strong>{t("tasksPage.filterByTitle")}</Typography.Text>
          <Input value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} allowClear />
        </Col>
        <Col xs={4}>
          <Typography.Text strong>{t("tasksPage.filterByStatus")}</Typography.Text>
          <Select
            className={classes.select}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            options={Object.values(StatusesEnum).map((status) => ({
              value: status,
              label: status,
            }))}
          />
        </Col>
        <Col xs={4}>
          <Typography.Text strong>{t("tasksPage.filterByOwner")}</Typography.Text>
          <Select
            className={classes.select}
            value={ownerFilter}
            onChange={(value) => setOwnerFilter(value)}
            allowClear
            options={users.map((user) => ({
              value: user.id,
              label: user.name,
            }))}
          />
        </Col>
      </Row>
      {paginatedTasks.length === 0 ? (
        <Empty />
      ) : (
        <>
          <Card loading={isLoading}>
            <table className={classes.table}>
              <thead>
                <tr className={classes.tableHeaderContainer}>
                  <th className={classes.tableHeader}>{t("tasksPage.title")}</th>
                  <th className={classes.tableHeader}>{t("tasksPage.owner")}</th>
                  <th className={classes.tableHeader}>{t("tasksPage.status")}</th>
                  <th className={classes.tableHeader}>{t("tasksPage.action")}</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTasks.map((task) => {
                  const owner = users.find((user) => user.id === task.userId);
                  return (
                    <tr key={task.id} className={classes.tableDataRow}>
                      <td className={classes.tableData}>{task.title}</td>
                      <td className={classes.tableData}>{owner?.name}</td>
                      <td className={classes.tableData}>
                        <Tag color={task.completed ? "success" : "error"}>
                          {task.completed ? t("tasksPage.completed") : t("tasksPage.notCompleted")}
                        </Tag>
                      </td>
                      <td className={classes.tableData}>
                        <Switch
                          checked={task.completed}
                          onChange={() => {
                            dispatch(toggleTaskStatus(task.id));
                            notification.success({
                              message: t("notificationMessages.statusUpdate"),
                            });
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          <Flex className={classes.paginationContainer}>
            <Button onClick={handlePrevPage} disabled={currentPage === 1}>
              {t("buttons.previous")}
            </Button>
            <Typography.Text>
              {t("tasksPage.pageInfo", { currentPage, totalPages })}
            </Typography.Text>
            <Button onClick={handleNextPage} disabled={currentPage >= totalPages}>
              {t("buttons.next")}
            </Button>
          </Flex>
        </>
      )}
    </>
  );
};
export default UserTasks;

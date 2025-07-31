import { Button, Card, Col, Empty, Flex, Input, Row, Select, Switch, Tag, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import usePagination from "./hooks/usePagination";
import { StatusesEnum } from "../../types/StatusesEnum";
import { toggleTaskStatus } from "../../features/slices/tasksSlice";
import useFilteredTasks from "./hooks/useFilteredTasks";
import classes from "./UserTasksTable.module.scss";
import { NotificationContext } from "../../context/NotificationContextProvider";

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

  useEffect(() => {
    setCurrentPage(1);
  }, [titleFilter, statusFilter, ownerFilter, setCurrentPage]);

  return (
    <>
      <Typography.Title className={classes.title}>{"Tasks"}</Typography.Title>
      <Row gutter={[16, 16]} className={classes.filterContainer}>
        <Col xs={4}>
          <Typography.Text strong>Filter by Title</Typography.Text>
          <Input
            placeholder="Filter by title..."
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            allowClear
          />
        </Col>
        <Col xs={4}>
          <Typography.Text strong>Filter by Status</Typography.Text>
          <Select
            className={classes.select}
            placeholder="Filter by status..."
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            options={Object.values(StatusesEnum).map((status) => ({
              value: status,
              label: status,
            }))}
          />
        </Col>
        <Col xs={4}>
          <Typography.Text strong>Filter by Owner</Typography.Text>
          <Select
            className={classes.select}
            placeholder="Filter by owner..."
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
                  <th className={classes.tableHeader}>Title</th>
                  <th className={classes.tableHeader}>Owner</th>
                  <th className={classes.tableHeader}>Status</th>
                  <th className={classes.tableHeader}>Action</th>
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
                          {task.completed ? "Completed" : "Not Completed"}
                        </Tag>
                      </td>
                      <td className={classes.tableData}>
                        <Switch
                          checked={task.completed}
                          onChange={() => {
                            dispatch(toggleTaskStatus(task.id));
                            notification.success({
                              message: "Status successfully changed",
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
              Previous
            </Button>
            <Typography.Text>
              Page {currentPage} of {totalPages}
            </Typography.Text>
            <Button onClick={handleNextPage} disabled={currentPage >= totalPages}>
              Next
            </Button>
          </Flex>
        </>
      )}
    </>
  );
};
export default UserTasks;

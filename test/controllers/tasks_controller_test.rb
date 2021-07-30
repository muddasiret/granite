require 'test_helper'

class TasksControllerTest < ActionDispatch::IntegrationTest
  def setup
    @creator = create(:user)
    @assignee = create(:user)
    @task = create(:task, user: @assignee, creator_id: @creator.id)
    @creator_headers = headers(@creator)
    @assignee_headers = headers(@assignee)
  end

  def test_should_list_all_tasks_for_valid_user
    get tasks_url, headers: @creator_headers
    assert_response :success
    response_body = response.parsed_body
    all_tasks = response_body['tasks']

    pending_tasks_count = Task.where(progress: 'pending').count
    completed_tasks_count = Task.where(progress: 'completed').count

    assert_equal all_tasks['pending'].length, pending_tasks_count
    assert_equal all_tasks['completed'].length, completed_tasks_count
  end

  def test_should_create_valid_task
    post tasks_url, params: { task: { title: 'Learn Ruby', user_id: @creator.id } }, headers: @creator_headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json['notice'], t('successfully_created', entity: 'Task')
  end


  
  def test_assignee_can_change_status_and_progress_of_task
    slug_url = "/tasks/#{@task.slug}"
    task_params = { task: { status: 'starred', progress: 'completed' } }
  
    put slug_url, params: task_params, headers: @assignee_headers
    assert_response :success
    @task.reload
    assert @task.starred?
    assert @task.completed?
  end
  
  def test_creator_can_change_status_and_progress_of_task
    slug_url = "/tasks/#{@task.slug}"
    task_params = { task: { status: 'starred', progress: 'completed' } }
  
    put slug_url, params: task_params, headers: @creator_headers
    assert_response :success
    @task.reload
    assert @task.starred?
    assert @task.completed?
  end

  def test_shouldnt_create_task_without_title
    post tasks_url, params: { task: { title: '', user_id: @creator.id } }, headers: @creator_headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json['errors'], "Title can't be blank"
  end
  
 
  
  def test_should_destroy_task
    initial_task_count = Task.all.size
    slug_url = "/tasks/#{@task.slug}"
  
    delete slug_url, headers: @creator_headers
    assert_response :success
    assert_equal Task.all.size, initial_task_count - 1
  end
  

  
  def test_assignee_can_change_status_and_progress_of_task
    slug_url = "/tasks/#{@task.slug}"
    task_params = { task: { status: 'starred', progress: 'completed' } }
  
    put slug_url, params: task_params, headers: @assignee_headers
    assert_response :success
    @task.reload
    assert @task.starred?
    assert @task.completed?
  end
  
  def test_creator_can_change_status_and_progress_of_task
    slug_url = "/tasks/#{@task.slug}"
    task_params = { task: { status: 'starred', progress: 'completed' } }
  
    put slug_url, params: task_params, headers: @creator_headers
    assert_response :success
    @task.reload
    assert @task.starred?
    assert @task.completed?
  end
end
class ProjectsController < ApplicationController
  def index
    @projects = Project.all
  end

  def new
    @project = Project.new
    @categories = Category.all.map { |c| [c.name, c.id]}
  end

  def create
    @user = User.first
    @project = @user.projects.create(project_params)
    redirect_to project_path(@project)
  end

  def show
    @project = Project.find(params[:id])
    @vote = Vote.new
  end

  private
  def project_params
    params.require(:project).permit(:name, :category_id)
  end
end

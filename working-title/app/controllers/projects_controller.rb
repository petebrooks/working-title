class ProjectsController < ApplicationController
  def index
    @projects = Project.all
  end

  def new
    @project = Project.new
    @categories = Category.all.map { |c| [c.name, c.id]}
  end

  def create
    @project = current_user.projects.create(project_params)
    @project.versions.create!(contributor: @project.initiator, contribution: params[:initial_text], insertion_index: -1)
    redirect_to project_version_path(@project, @project.versions.first)
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

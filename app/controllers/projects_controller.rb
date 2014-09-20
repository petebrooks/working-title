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
    # Replaced with database callback and validations:
    # @project.versions.create!(contributor: @project.initiator, contribution: params[:initial_text], insertion_index: -1)
    redirect_to project_version_path(@project, @project.versions.first)
  end

  def show
    @project = Project.find(params[:id])
    @popular_version = @project.get_popular_version
    @vote = Vote.new
    # Should add error page and validations to prevent projects w/o initial versions
    redirect_to project_version_path(@project, @popular_version) unless @popular_version == nil
  end

  def tree
    @project = Project.find(params[:id])
    gon.tree_data = @project.create_tree.to_json
  end

  private
  def project_params
    params.require(:project).permit(:name, :category_id, :initial_text)
  end
end
